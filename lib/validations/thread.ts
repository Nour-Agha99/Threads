import * as z from "zod";

const threadSchema = z.object({
  thread: z.string().min(3, { message: "Minimum 3 Characters" }).max(30).nonempty(),
 
});

export default threadSchema;
