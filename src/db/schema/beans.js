import {pgTable, serial, varchar, timestamp, integer} from "drizzle-orm/pg-core";
import {roasters} from "./roasters.js";
import {suppliers} from "./suppliers.js";
import {relations} from "drizzle-orm";

export const beans = pgTable('beans', {
    id: serial('id').primaryKey(),
    roaster_id: integer('roaster_id').references(() => roasters.id),
    supplier_id: integer('supplier_id').references(() => suppliers.id),
    name: varchar('name', {length: 70}).notNull(),
    slug: varchar('slug', {length: 70}).notNull(),
    origin: varchar('origin', {length: 50}),
    flavor: varchar('flavor', {length: 70}),
    process: varchar('process', {length: 50}),
    altitude: varchar('altitude', {length: 50}),
    link: varchar('link', {length: 230}),
    created_at: timestamp('created_at', {precision: 6, withTimezone: true}).defaultNow(),
    updated_at: timestamp('created_at', {precision: 6, withTimezone: true})
});

export const beansRelations = relations(beans, ({one}) => ({
    roaster: one(roasters, {
        fields: [beans.roaster_id],
        references: [roasters.id],
    }),
    supplier: one(suppliers, {
        fields: [beans.roaster_id],
        references: [suppliers.id],
    }),
}));