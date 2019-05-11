<template>
  <div class="user-container" ref="userContainer" tabindex="0" @blur.stop="handleUserDetailBlur" v-show="userDetailToShow && isLogin">
    <div class="imgAndName">
      <div class="user-img">
        <Icon type="userImg" v-show="!imgPath"></Icon>
        <img class="changedImg" :src="imgPath" v-show="imgPath">
      </div>
      <p class="user-name">{{ name }}</p>
      <Icon type="userEdit" class="user-edit-icon" @mouseup.native="handleEditorToShow"></Icon>
    </div>
    <div class="otherInfo">
      <div class="gender"><p>{{ `性别: ${gender}` }}</p></div>
      <div class="age"><p>{{ `生日: ${birth.getFullYear()}年${birth.getMonth() + 1}月${birth.getDate()}日 `}}</p></div>
    </div>
    <div class="description">
      <p>简介:</p>
      <div class="des-content">
        <p>{{ description }}</p>
      </div>
    </div>
    <div class="log-out" @mouseup="handleLogOut">
      <Icon type="logout" class="log-out-icon"></Icon>
      <p>退出登录</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '../BaseIconContainer.vue';

export default {
  name: 'UserDetails',
  computed: {
    ...mapGetters(['isLogin', 'birth', 'gender', 'description', 'name', 'userImg']),
    imgPath() {
      if (this.userImg) {
        return `data:image/jpeg;base64,${this.userImg}`;
      }
      return '';
    },
  },
  watch: {
    userDetailToShow(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.userContainer.focus();
        }, 0);
      }
    },
  },
  props: {
    userDetailToShow: {
      type: Boolean,
    },
  },
  components: {
    Icon,
  },
  methods: {
    handleUserDetailBlur() {
      setTimeout(() => {
        this.$emit('update:userDetailToShow', false);
      }, 0);
    },
    handleLogOut() {
      this.$store.dispatch('updateLoginUser', '');
    },
    handleEditorToShow() {
      this.$bus.$emit('user-editor-show');
    },
  },
};
</script>

<style scoped lang="scss">
.user-container {
  position: absolute;
  top: 83px;
  right: 30px;
  width: 210px;
  height: 180px;
  background: white;
  border-radius: 5px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  outline: none;
  .imgAndName {
    width: 100%;
    height: 40px;
    border-bottom: 0.3px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    display: flex;
    .user-img {
      width: 35px;
      height: 35px;
      margin: auto 0 auto 15px;
      display: flex;
      .changedImg {
        margin: auto;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .user-name {
      margin: auto 0 auto 10px;
      font-size: 13px;
    }
    .user-edit-icon {
      margin: auto 15px auto auto;
      cursor: pointer;
    }
  }
  .otherInfo {
    width: 100%;
    height: 40px;
    display: flex;
    font-size: 12px;
    border-bottom: 0.3px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    .gender {
      width: 37%;
      height: 70%;
      display: flex;
      margin: auto;
      border-right: 0.3px solid rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      p {
        margin: auto auto auto 15px;
      }
    }
    .age {
      width: 63%;
      height: 70%;
      display: flex;
      margin: auto;
      p {
        margin: auto;
      }
    }
  }
  .description {
    width: 100%;
    height: 60px;
    display: flex;
    font-size: 12px;
    flex-direction: column;
    border-bottom: 0.3px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    p {
      margin: 4px auto 0 15px;
    }
    .des-content {
      width: 180px;
      height: 34px;
      margin: 0 auto auto 15px;
      p {
        font-size: 11px;
        margin: 0 auto 0 0;
      }
    }
  }
  .log-out {
    width: 100%;
    height: 40px;
    display: flex;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    p {
      font-size: 13px;
      margin: auto auto auto 44px;
    }
    .log-out-icon {
      margin: auto 0 auto 15px;
    }
  }
}
.user-container:before {
  content: "";
  border: 10px solid white;
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
