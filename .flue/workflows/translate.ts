import { defineAgent, defineWorkflow, type WorkflowRouteHandler } from '@flue/runtime';
import * as v from 'valibot';

export const route: WorkflowRouteHandler = async (_c, next) => next();

const translator = defineAgent(() => ({ model: 'google/gemini-3.1-flash-lite' }));

export default defineWorkflow({
    agent: translator,
    input: v.object({ text: v.string(), language: v.string() }),

    async run({ harness, input }) {
        const { data } = await (
            await harness.session()
        ).prompt(`Translate this to ${input.language}: "${input.text}"`, {
            result: v.object({
                translation: v.string(),
                confidence: v.picklist(['low', 'medium', 'high']),
            }),
        });
        return data;
    },
});