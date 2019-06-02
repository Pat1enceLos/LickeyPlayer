<template>
  <div class="user">
    <div class="imgContainer">
      <div class="defaultImg">
        <Icon :type="userFav" v-show="!imgPath"></Icon>
        <img :src="imgPath" v-show="imgPath">
      </div>
      <Icon type="rightArrow" class="rightArrow" @mousedown.native="handleMousedown" :style="{ transform: isLogin ? 'rotate(90deg)' : '' }"></Icon>
      <user-details class="user-detail" :userDetailToShow.sync="userDetailToShow" @animationend.native="handleAnim"></user-details>
      <transition name="edit-anim">
        <user-editor v-show="userEditorToShow"></user-editor>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserDetails from './UserDetails.vue';
import UserEditor from './UserEdit';
import Icon from '../BaseIconContainer.vue';

export default {
  name: 'UserInfo',
  data() {
    return {
      userDetailToShow: false,
      userEditorToShow: false,
    };
  },
  watch: {
    userDetailToShow(val) {
      if (!val) {
        document.querySelector('.user-detail').classList.add('user-hide-anim');
        document.querySelector('.user-detail').classList.remove('user-show-anim');
      } else {
        document.querySelector('.user-detail').style.display = 'flex';
        document.querySelector('.user-detail').classList.add('user-show-anim');
        document.querySelector('.user-detail').classList.remove('user-hide-anim');
      }
    },
  },
  components: {
    Icon,
    'user-details': UserDetails,
    'user-editor': UserEditor,
  },
  computed: {
    ...mapGetters(['isLogin', 'userImg']),
    userFav() {
      if (this.isLogin) {
        return 'userImg';
      }
      return 'user';
    },
    imgPath() {
      if (this.userImg) {
        return `data:image/jpeg;base64,${this.userImg}`;
      }
      return '';
    },
  },
  mounted() {
    this.$bus.$on('user-editor-show', () => {
      this.userEditorToShow = true;
      this.userDetailToShow = false;
    });
    this.$bus.$on('edit-finished', () => {
      this.userEditorToShow = false;
      this.userDetailToShow = true;
    });
  },
  methods: {
    handleAnim(e) {
      for (let i = 0; i < e.target.classList.length; i += 1) {
        if (e.target.classList[i] === 'user-hide-anim') {
          document.querySelector('.user-detail').style.display = 'none';
        }
      }
    },
    handleMousedown() {
      if (!this.isLogin) {
        this.$electron.ipcRenderer.send('add-windows-login');
      } else {
        document.querySelector('.user-detail').style.display = 'flex';
        this.userDetailToShow = !this.userDetailToShow;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.user {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .imgContainer {
    width: 60px;
    height: 50px;
    display: flex;
    margin: auto 10px 0 auto;
    .defaultImg {
      width: 35px;
      height: 35px;
      display: flex;
      margin: auto;
      img {
        width: 30px;
        height: 30px;
        margin: auto;
        border-radius: 50%;
      }
    }
    .rightArrow {
      margin: auto;
    }
    .user-detail {
      display: none;
    }
  }
}
.user-show-anim {
  animation: user-show 200ms linear;
}
.user-hide-anim {
  animation: user-hide 200ms linear;
}
@keyframes user-show {
  0% { opacity: 0; transform: translateY(-30px) }
  50% { opacity: 0.5; transform: translateY(-15px) }
  100% { opacity: 1; transform: translateY(0px) }
}
@keyframes user-hide {
  0% { opacity: 1; transform: translateY(0px) }
  50% { opacity: 0.5; transform: translateY(-15px) }
  100% { opacity: 0; transform: translateY(-30px) }
}

.edit-anim-enter-active, .edit-anim-leave-active {
  transition: opacity .3s linear;
}
.edit-anim-enter, .edit-anim-leave-to {
  opacity: 0;
}
</style>
