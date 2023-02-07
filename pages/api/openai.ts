import { supabase } from '@/utils/supabase-client';
import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import { Configuration, OpenAIApi } from 'openai';

export default withApiAuth(async function createGPT3Response(
  req,
  res,
  supabaseServerClient
) {
  // diet_items_id: item.id,
  // users_id: user.id,
  // subscriptionId: subscription?.id,
  // name: item.name,
  // type: item.type
  try {
    const userId = req.body[0]?.user_id;
    const subscriptionId = req.body[0]?.subscription_id;
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const mealPlanResponse = await supabase
      .from('meal_plans')
      .upsert({ user_id: userId, subscription_id: subscriptionId });
    console.log(mealPlanResponse);
    // const supaBaseResponse = await supabase.from('meal_plan_preferences').insert(req.body.map((item:any) => ({user_id: item.user_id, meal_plan_id: mealPlanResponse.})))
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: 'Tell me a joke'
    });
    console.log(req.body);
    return res.status(201).send(response.data);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
});
