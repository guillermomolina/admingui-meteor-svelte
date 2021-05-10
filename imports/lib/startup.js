import { Match } from 'meteor/check';
import SimpleSchema from "simpl-schema";

SimpleSchema.extendOptions({renderer: Match.Optional(Function)});
//SimpleSchema.extendOptions(['renderer']);
