import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import { Configuration, OpenAIApi } from 'openai';

export default withApiAuth(async function createGPT3Response(
  req,
  res,
  supabaseServerClient
) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.listModels();
    return res.status(201).send(response.data);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
});
