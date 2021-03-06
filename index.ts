import { default as path } from "path";
import {
  Bonbons,
  BaseApp,
  BonbonsApp,
  JSON_RESULT_OPTIONS,
  ENV_MODE,
  DEPLOY_MODE,
  TPL_RENDER_OPTIONS,
  JsonResultResolvers,
  Renders
} from "@bonbons/core";
import { TestService } from "./src/service/test";
import { ABC, ImplementService } from "./src/service/imp";
import { valueTest, TOKEN_TEST } from "./src/config/test";
import { TestController } from "./src/controller/test";
import { MoreController } from "./src/controller/more";
import { DemoPipe } from "./src/pipes/demo.pipe";
import { AlwaysNewService } from "src/service/new";
import { BusinessController } from "./src/controller/business";
import { StaffService } from "src/service/business/staff.service";
import { VipService } from "src/service/business/vip.service";

Bonbons.New
  .scoped(ImplementService)
  .scoped(ABC, ImplementService)
  .singleton(TestService)
  .singleton(StaffService)
  .singleton(VipService)
  .renew(AlwaysNewService)
  .controller(TestController)
  .controller(MoreController)
  .controller(BusinessController)
  // .pipe(DemoPipe)
  .option(TOKEN_TEST, valueTest)
  .option(ENV_MODE, { mode: "development", trace: true })
  .option(DEPLOY_MODE, { port: 3000 })
  .option(JSON_RESULT_OPTIONS, { staticType: true, resolver: JsonResultResolvers.decamelize })
  .option(TPL_RENDER_OPTIONS, { root: path.resolve(__dirname, "./src/views"), extensions: "ejs", render: Renders.ejs })
  .start(((configs) => {
    // console.log(configs.get(TPL_RENDER_OPTIONS));
    console.log("\nhello world!");
  }));

// @BonbonsApp({
//   controller: [
//     TestController,
//     MoreController
//   ],
//   scoped: [
//     ImplementService,
//     { token: ABC, implement: ImplementService }
//   ],
//   singleton: [TestService],
//   pipes: [DemoPipe],
//   options: [
//     { token: TOKEN_TEST, value: valueTest },
//     { token: ENV_MODE, value: { trace: true } },
//     { token: DEPLOY_MODE, value: { port: 3200 } },
//     { token: JSON_RESULT_OPTIONS, value: { staticType: true, resolver: JsonResultResolvers.decamelize } },
//     { token: TPL_RENDER_OPTIONS, value: { root: path.resolve(__dirname, "./src/views"), extensions: "ejs", render: Renders.ejs } }
//   ]
// })
// class App extends BaseApp {

//   start(): void {
//     const { port } = this.config.get(DEPLOY_MODE);
//     this.logger.debug(`app is running on port ${port || 3000}`);
//   }

// }

// new App().start();