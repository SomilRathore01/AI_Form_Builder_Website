const { pgTable, serial, varchar, text } = require("drizzle-orm/pg-core");

export const Jsonforms = pgTable('jsonforms',{
    id: serial('id').primaryKey(),
    jsonform:text('jsonform').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdDate: varchar('createdDate').notNull()
})
  