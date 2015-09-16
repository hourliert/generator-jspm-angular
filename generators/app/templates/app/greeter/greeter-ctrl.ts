import {Inject} from "angular-decorators";

@Inject("$scope")
export class GreeterCtrl {

  public greeting: any;

  constructor(
    private scope: ng.IScope
    ) {
    this.greeting = {
      text: "Hello"
    };
    console.log("Look at my injected scope", scope);
  }
}
