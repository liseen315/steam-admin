<template>
  <div class="auth-container">
    <div class="header-options">
      <Button type="primary" @click="getRoleHandler" v-access="`sys:user:add`">添加管理员</Button>
    </div>
    <Table border :columns="authColums" :data="authListData"></Table>
    <Modal
      v-model="showCreateModal"
      width="320"
      class="add-role-modal"
      @on-cancel="this.onModelCancelHandler"
    >
      <p slot="header" class="header">
        <span>新增管理员</span>
      </p>
      <div class="model-content">
        <Form :model="formAddAuth" ref="formAddAuth" :rules="ruleAuth">
          <FormItem label="用户名" prop="userName">
            <Input v-model="formAddAuth.userName"/>
          </FormItem>
          <FormItem label="密码" prop="passWord">
            <Input type="password" v-model="formAddAuth.passWord"/>
          </FormItem>
          <FormItem label="角色">
            <Select v-model="roleIdSelect" @on-change="this.onRoleSelectHandler">
              <Option
                v-for="item in this.roleList"
                :value="item.roleId"
                :key="item.roleId"
              >{{ item.roleName }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" long @click="addAuthHandler('formAddAuth')">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import AuthService from "../service/AuthService";
import RoleService from "../service/RoleService";
import { type } from "os";
export default {
  name: "AuthList",
  data() {
    const validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    const validatePassWord = (ruel, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      roleList: [],
      showCreateModal: false,
      authColums: [
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "角色",
          key: "roleName"
        },
        {
          title: "创建时间",
          key: "createAt"
        },
        {
          title: "修改时间",
          key: "updateAt"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.updateAuth(params);
                    }
                  },
                  directives: [
                    {
                      name: "access",
                      value: "sys:user:update"
                    }
                  ]
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeAuth(params);
                    }
                  },
                  directives: [
                    {
                      name: "access",
                      value: "sys:user:remove"
                    }
                  ]
                },
                "删除"
              )
            ]);
          }
        }
      ],
      authListData: [],
      formAddAuth: {
        userName: "",
        passWord: ""
      },
      roleIdSelect: -1,
      ruleAuth: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        passWord: [{ validator: validatePassWord, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getAuthList();
  },
  methods: {
    getRoleHandler() {
      // 先获取角色列表
      new RoleService().getRoleList().then(res => {
        if (res.code === 0) {
          this.roleList = res.body;
          this.showCreateModal = true;
        }
      });
    },
    getAuthList() {
      new AuthService().getList().then(res => {
        if (res.code === 0) {
          this.authListData = res.body;
        }
      });
    },
    onRoleSelectHandler(value) {
      this.roleIdSelect = value;
    },
    addAuthHandler(name) {
      // 如果没选择role就不让添加
      this.$refs[name].validate(valid => {
        if (this.roleIdSelect < 0 || typeof this.roleIdSelect === "undefined") {
          this.$Message.error("请选择角色");
          return;
        }
        new AuthService()
          .addAuth({
            userName: this.formAddAuth.userName,
            passWord: this.formAddAuth.passWord,
            roleId: this.roleIdSelect
          })
          .then(res => {
            if (res.code === 0) {
              // 添加管理员成功重新刷新管理员列表
              this.$Message.success("添加管理员成功");
              this.onModelCancelHandler();
              this.getAuthList();
            }
          });
      });
    },
    onModelCancelHandler() {
      this.$refs["formAddAuth"].resetFields();
      this.roleIdSelect = -1;
      this.showCreateModal = false;
    },
    updateAuth(params) {
      console.log("-----updateAuth--", params);
    },
    removeAuth(params) {
      this.$Modal.warning({
        title: "提示",
        content: "确定删除此管理么",
        onOk: () => {
          new AuthService().removeAuth(params.row.userId).then(res => {
            // 刷新列表
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.add-role-modal {
  .header {
    text-align: center;
  }
}
</style>


