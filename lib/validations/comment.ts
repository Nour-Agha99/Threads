import * as z from "zod";
const commentSchema = z.object({
  thread: z.string().min(3,{message:'Minimum 3 Characters'}).max(30).nonempty(),
});

export default commentSchema;