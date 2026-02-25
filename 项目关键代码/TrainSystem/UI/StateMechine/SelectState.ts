

import { IState } from "./IState";

class SelectState implements IState {
  name = "Select";

  onEnter() {
    console.log("进入 Select");
  }

  onEvent(event: string, roleId: string) {
    if (event === "SELECT_ROLE") {
      console.log("选择角色", roleId);
    }
  }
}
