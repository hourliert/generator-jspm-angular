/// <reference path="../typings/tsd.d.ts"/>

import GreeterModule from "./greeter/greeter";
import "angular";

angular.module("<%= appname %>", [
  GreeterModule.name
]);
