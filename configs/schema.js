const { pgTable, serial, varchar, text, integer } = require("drizzle-orm/pg-core");

export const Jsonforms = pgTable('jsonforms',{
    id: serial('id').primaryKey(),
    jsonform:text('jsonform').notNull(),
    theme:varchar('theme'),
    background:varchar('background'),
    styles:text('styles'),
    createdBy: varchar('createdBy').notNull(),
    createdDate: varchar('createdDate').notNull()
})

export const userResponses = pgTable('userResponses',{
    id: serial('id').primaryKey(),
    jsonResponse:text('jsonResponse').notNull(),
    createdBy: varchar('createdBy').default('anonymous'),
    createdAt: varchar('createdAt').notNull(),
    formRef: integer('formRef').references(()=>Jsonforms.id)
})
  