import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../swagger.json";

class swaggerSetup {
  public static init(app: Application): void {
    const options = {
      customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css"
    };
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
  }
}
export default swaggerSetup;
