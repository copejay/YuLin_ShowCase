
import { IState } from "./IState";

class IdleState implements IState {
  name = "Idle";

  onEnter() {
    console.log("进入 Idle");
  }

  onEvent(event: string) {
    if (event === "OPEN") {
      console.log("Idle 收到 OPEN");
    }
  }
}
