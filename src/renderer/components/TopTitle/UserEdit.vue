<template>
  <div class="user-editor" ref="userEditor">
    <div class="imgAndName">
      <img class="user-img">
      <input class="user-name">
    </div>
    <div class="edit-description">
      <p>简介:</p>
      <textarea></textarea>
    </div>
    <div class="edit-gender">
      <p>性别:</p>
      <div class="gender-chooser">
        <label><input name="gender" type="radio">男</label>
        <label><input name="gender" type="radio">女</label>
        <label><input name="gender" type="radio">其他</label>
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
      <div class="edit-save"><p>保存</p></div>
      <div class="edit-cancel"><p>取消</p></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  data() {
    return {
      value: '',
    };
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
  background: white;
  border-radius: 5px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  outline: none;
  .imgAndName {
    width: 100%;
    height: 40px;
    display: flex;
    .user-img {
      width: 30px;
      height: 30px;
      margin: auto 0 auto 15px;
      background: black;
      cursor: pointer;
    }
    .user-name {
      width: 140px;
      height: 22px;
      margin: auto 0 auto 10px;
      font-size: 13px;
      outline: none;
      border: 0.5px solid rgba(0, 0, 0, 0.1);
      text-indent: 4px;
    }
  }
  .edit-description {
    width: 100%;
    height: 70px;
    font-size: 12px;
    border-bottom: 0.3px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    p {
      margin: 4px auto 0 15px;
    }
    textarea {
      width: 180px;
      height: 35px;
      margin: 0 auto auto 15px;
      text-indent: 4px;
      outline: none;
      font-size: 12px;
    }
  }
  .edit-gender {
    width: 100%;
    height: 30px;
    display: flex;
    font-size: 12px;
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
    border-bottom: 0.3px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
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
    .edit-save {
      width: 50px;
      height: 28px;
      background: rgba(0, 0, 0, 0.1);
      margin: auto 20px auto 45px;
      border-radius: 5px;
      display: flex;
      cursor: pointer;
      p {
        font-size: 13px;
        margin: auto;
      }
    }
    .edit-cancel {
      width: 50px;
      height: 28px;
      background: rgba(0, 0, 0, 0.1);
      margin: auto auto auto 0;
      border-radius: 5px;
      display: flex;
      cursor: pointer;
      p {
        font-size: 13px;
        margin: auto;
      }
    }
  }
}
.user-editor:before {
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
