<template>
  <div :class="container">
    <transition-group name="toast" class="transGroup">
      <div v-for="m in notifications"
           :key="m.id"
           class="messageContainer"
           :id="'item' + m.id">
        <div class="black-gradient-result"/>
        <div class="stateContainer">
          <div class="bubbleContent">
            <p class="content">{{ m.content }}</p>
          </div>
          <Icon type="closeNotification" class="bubbleClose" @click.native.left="closeMessage(m.id)"></Icon>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Icon from './BaseIconContainer.vue';

  export default {
    name: 'notification',
    components: {
      Icon,
    },
    computed: {
      ...mapGetters(['notifications']),
      container() {
        return process.platform === 'win32' ? 'winContainer' : 'container';
      },
    },
    methods: {
      closeMessage(id) {
        this.$store.dispatch('removeNotifications', id);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .winContainer {
    -webkit-app-region: no-drag;
    position: absolute;
    top: 34px;
    right: 34px;
  }
  .container {
    -webkit-app-region: no-drag;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: auto;
    height: auto;

    .toast-enter, .toast-enter-active {
      transform: translateX(0px);
    }
    .toast-enter, .toast-leave-active {
      transform: translateX(403px);
    }
    top: 25px;
    right: 34px;
  }
  .transGroup {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .messageContainer {
      z-index: 8;
      transition: 400ms cubic-bezier(0.17, 0.67, 0.17, 0.98);
      transition-property: opacity, transform;
      width: auto;
      white-space: nowrap;
      right: 0;
      margin-bottom: 15px;
      .black-gradient-result {
        position: absolute;
        width: 100%;
        box-shadow: 0 0 2px 0 rgba(0,0,0,0.30);
        height: 62px;
        border-radius: 8px;
        clip-path: inset(0 round 8px);
      }
      .stateContainer {
        display: flex;
        justify-content: flex-start;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        z-index: 8;
        border: 1px solid rgba(255, 255, 255, 0.2);
        height: 43px;
        border-radius: 8px;
        clip-path: inset(0 round 8px);

        .bubbleClose {
          display: flex;
        }
        .bubbleContent {
          width: auto;
          height: 15px;
          margin: auto 30px auto 15px;
          display: flex;
          .content {
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            font-size: 13px;
            line-height: 15px;
            letter-spacing: 0.4px;
          }
        }
      }
    }
  }

  .toast-leave-active {
    position: absolute;
    transition: transform 500ms cubic-bezier(0.17, 0.67, 0.17, 0.98);
  }
  .toast-enter-active {
    transition: transform 250ms cubic-bezier(0.17, 0.67, 0.17, 0.98);
  }
  .toast-enter, .toast-leave-to {
    transform: translateX(350px);
  }


</style>
