import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { getURL } from '@/utils/helpers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/utils/supabase-client';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/utils/useUser';

export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

type Input = {
  proteins: string[];
  carbs: string[];
  fats: string[];
  supplements: string[];
  drinks: string[];
  fruits: string[];
  vegetables: string[];
};

const CreateMealPlanPage = ({ user }: { user: User }) => {
  const supabaseClient = useSupabaseClient();
  const mealPlans = [
    { id: 12356234124, name: 'My first AI generated meal plan' },
    { id: 12858713283, name: 'My second AI generated meal plan' }
  ];
  const [someData, setSomeData] = useState() as any[];
  const [isLoadingOpenAI, setIsLoadingOpenAI] = useState(false);
  const { dietItems } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const handleModelTest = async () => {
    setIsLoadingOpenAI(true);
    const response = await axios.get(`${getURL()}api/openai`);
    setSomeData(() => {
      setIsLoadingOpenAI(false);
      console.log(response?.data);
      return response?.data?.choices[0];
    });
  };
  const onSubmit = (data: Input) => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it
  console.log(dietItems);
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
        Create A New Meal Plan
      </h1>
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <select defaultValue="test" {...register('example')}>
          {}
        </select>

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register('exampleRequired', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
      <button
        disabled={isLoadingOpenAI}
        className="bg-pink-500"
        onClick={handleModelTest}
      >
        {isLoadingOpenAI && <span>...Loading</span>}
        Funnybot
      </button>
      {someData && (
        <div className="flex justify-center space-x-2">
          <div>{someData.text}</div>
        </div>
      )}
    </div>
  );
};

export default CreateMealPlanPage;
