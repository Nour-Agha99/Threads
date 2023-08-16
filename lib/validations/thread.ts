import * as z from "zod";

const threadSchema = z.object({
  thread: z.any(),
});

export default threadSchema;
