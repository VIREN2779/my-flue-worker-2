import { defineAgent, defineWorkflow, type WorkflowRouteHandler } from '@flue/runtime';
import * as v from 'valibot';

export const route: WorkflowRouteHandler = async (_c, next) => next();

const greeter = defineAgent(() => ({ model: 'google/gemini-2.5-flash-lite' }));

export default defineWorkflow({
    agent: greeter,
    input: v.object({ name: v.string() }),

    async run({ harness, input }) {
        const { data } = await (
            await harness.session()
        ).prompt(`Write a short, warm one-sentence greeting for someone named ${input.name}.`, {
            result: v.object({
                greeting: v.string(),
            }),
        });
        return data;
    },
});