import { z } from "zod";
import {
  categorySchema,
  getCategoriesSchema,
  requestCategorySchema,
} from "../schemas/categorySchema";

type Tcategoty = z.infer<typeof categorySchema>;

type TreponseCategory = z.infer<typeof requestCategorySchema>;

type TarrayCategory = z.infer<typeof getCategoriesSchema>;

export { Tcategoty, TreponseCategory, TarrayCategory };
