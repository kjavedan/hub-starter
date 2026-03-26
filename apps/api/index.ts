import { env } from "@hub-starter/config";
import { app } from "@/app";

const port = env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/docs`);
});
