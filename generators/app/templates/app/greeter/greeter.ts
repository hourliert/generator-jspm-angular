import {GreeterCtrl} from "./greeter-ctrl";
import "angular";

let module = angular.module("greeter-module", []);

export default module.controller("GreeterCtrl", GreeterCtrl);
