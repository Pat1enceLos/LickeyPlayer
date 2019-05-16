<template>
  <div class="user-editor" ref="userEditor">
    <div class="imgAndName">
      <div class="edit-user-img" @mouseup="handleChangeUserImg">
        <Icon type="userImg" v-show="!imgPath"/>
        <img class="edit-img" :src="imgPath" v-show="imgPath">
      </div>
      <input class="edit-user-name" v-model="inputName" maxlength="16">
    </div>
    <div class="edit-description">
      <p>简介:</p>
      <textarea class="edit-des-content" v-model="inputDescription" maxlength="32"></textarea>
    </div>
    <div class="edit-gender">
      <p>性别:</p>
      <div class="gender-chooser">
        <label><input name="gender" type="radio" value="男">男</label>
        <label><input name="gender" type="radio" value="女">女</label>
        <label><input name="gender" type="radio" value="保密">保密</label>
      </div>
    </div>
    <div class="edit-age">
      <p>生日:</p>
      <el-date-picker
        v-model="value"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="edit-change">
      <div class="edit-save" @mouseup="handleSaveEdit"><p>保存</p></div>
      <div class="edit-cancel" @mouseup="handleCancelEdit"><p>取消</p></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '../BaseIconContainer.vue';

export default {
  name: 'UserEdit',
  data() {
    return {
      value: '',
      inputName: '',
      inputDescription: '',
      genderDB: '',
    };
  },
  components: {
    Icon,
  },
  computed: {
    ...mapGetters(['birth', 'name', 'description', 'gender', 'loginUser', 'userImg']),
    imgPath() {
      if (this.userImg) {
        return `data:image/jpeg;base64,${this.userImg}`;
      }
      return '';
    },
  },
  mounted() {
    this.$bus.$on('user-editor-show', () => {
      this.value = this.birth;
      this.inputName = this.name;
      this.inputDescription = this.description;
      const radios = document.getElementsByName('gender');
      radios.forEach((item) => {
        if (item.value === this.gender) {
          item.checked = true;
        }
      });
    });
  },
  methods: {
    handleChangeUserImg() {
      this.changeUserImg();
    },
    handleSaveEdit() {
      const radios = document.getElementsByName('gender');
      radios.forEach((item) => {
        if (item.checked) {
          this.$store.dispatch('updateGender', item.value);
          this.genderDB = item.value;
        }
      });
      if (this.value) {
        this.$store.dispatch('updateBirth', this.value);
      }
      this.$store.dispatch('updateDescription', document.querySelector('.edit-des-content').value);
      this.$store.dispatch('updateName', document.querySelector('.edit-user-name').value);
      this.storeQueueHandler({
        table: 'User',
        data: {
          gender: this.genderDB, birth: this.value, description: document.querySelector('.edit-des-content').value, name: document.querySelector('.edit-user-name').value,
        },
      });
      this.$bus.$emit('edit-finished');
    },
    handleCancelEdit() {
      this.$bus.$emit('edit-finished');
    },
  },
};
</script>

<style scoped lang="scss">
.user-editor {
  position: absolute;
  top: 83px;
  right: 30px;
  width: 210px;
  height: 220px;
  background: #808080;
  border-radius: 5px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  outline: none;
  .imgAndName {
    width: 100%;
    height: 40px;
    display: flex;
    color: white;
    .edit-user-img {
      width: 35px;
      height: 35px;
      margin: auto 0 auto 15px;
      cursor: pointer;
      display: flex;
      .edit-img {
        margin: auto;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .edit-user-name {
      width: 140px;
      height: 22px;
      margin: auto 0 auto 7px;
      font-size: 13px;
      outline: none;
      border: 0.5px solid rgba(255, 255, 255, 0.6);
      text-indent: 4px;
      color: white;
    }
  }
  .edit-description {
    width: 100%;
    height: 70px;
    font-size: 12px;
    border-bottom: 0.3px solid rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    color: white;
    p {
      margin: 4px auto 0 15px;
    }
    textarea {
      width: 180px;
      height: 35px;
      margin: 0 auto auto 18px;
      outline: none;
      font-size: 12px;
      border: 0.1px solid rgba(255, 255, 255, 0.8);
      color: white;
    }
  }
  .edit-gender {
    width: 100%;
    height: 30px;
    display: flex;
    font-size: 12px;
    color: white;
    p {
      margin: auto 0 auto 15px;
    }
    .gender-chooser {
      margin: auto auto auto 20px;
    }
    label {
      margin-right: 10px;
    }
    input {
      margin-right: 3px;
    }
  }
  .edit-age {
    width: 100%;
    height: 40px;
    display: flex;
    font-size: 12px;
    border-bottom: 0.3px solid rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    color: white;
    p {
      margin: auto 0 auto 15px;
      white-space: nowrap;
    }
    .el-date-editor {
      transform: scale(0.8);
    }
  }
  .edit-change {
    width: 100%;
    height: 40px;
    display: flex;
    color: white;
    .edit-save {
      width: 50px;
      height: 28px;
      background: rgba(255, 255, 255, 0.1);
      margin: auto 20px auto 45px;
      border-radius: 5px;
      display: flex;
      cursor: pointer;
      border: 0.5px solid rgba(0, 0, 0, 0.15);
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      p {
        font-size: 13px;
        margin: auto;
      }
    }
    .edit-cancel {
      width: 50px;
      height: 28px;
      background: rgba(255, 255, 255, 0.1);
      margin: auto auto auto 0;
      border-radius: 5px;
      display: flex;
      cursor: pointer;
      border: 0.5px solid rgba(0, 0, 0, 0.15);
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      p {
        font-size: 13px;
        margin: auto;
      }
    }
  }
}
.user-editor:before {
  content: "";
  border: 10px solid #808080;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  border-radius: 5px;
  width: 0;
  height: 0;
  position: absolute;
  right: 9px;
  top: -18px;
}
</style>
