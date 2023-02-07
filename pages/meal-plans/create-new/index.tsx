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

type DietItem = {
  created_at: string;
  upated_at: string;
  name: string;
  type: string | null;
  id: number;
  diet_category_id: number;
  diet_category: {
    name: string;
  };
};

// type Input = {
//   proteins: DietItem[];
//   carbs: DietItem[];
//   fats: DietItem[];
//   supplements: DietItem[];
//   drinks: DietItem[];
//   fruits: DietItem[];
//   vegetables: DietItem[];
// };

const CreateMealPlanPage = ({ user }: { user: User }) => {
  const mealPlans = [
    { id: 12356234124, name: 'My first AI generated meal plan' },
    { id: 12858713283, name: 'My second AI generated meal plan' }
  ];
  const [someData, setSomeData] = useState() as any[];
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { dietItems, subscription } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const handleModelTest = async (payload: any) => {
    setIsFormSubmitting(true);
    const response = await axios.post(`${getURL()}api/openai`, payload);
    setIsFormSubmitting(false);
    return response;
  };

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const selectedDiet = Object.entries(data).map(([key, value]) => {
        if (value) {
          return dietItems?.find((item: DietItem) => item.id === +key);
        }
        return null;
      });

      const mappedSelectedDiet = selectedDiet
        .filter((item: DietItem | null) => item !== null)
        .map((item: DietItem) => ({
          diet_items_id: item.id,
          users_id: user.id,
          subscriptionId: subscription?.id,
          name: item.name,
          type: item.type
        }));

      await handleModelTest(mappedSelectedDiet);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
        Create A New Meal Plan
      </h1>
      <form
        className="flex flex-col items-center space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <h3>Protiens</h3>
          {dietItems
            ?.filter((item: DietItem) => item.diet_category.name === 'Proteins')
            ?.map((item: DietItem) => (
              <div key={item.id} className="inline-flex space-x-4">
                <input
                  {...register(`${item.id}`)}
                  id={`${item.name}${item.type ? '-' + item.type : ''}`}
                  type="checkbox"
                />
                <label
                  htmlFor={`${item.name}${item.type ? '-' + item.type : ''}`}
                >{`${item.name}${item.type ? '-' + item.type : ''}`}</label>
              </div>
            ))}
          <h3>Carbs</h3>
          {dietItems
            ?.filter((item: DietItem) => item.diet_category.name === 'Carbs')
            ?.map((item: DietItem) => (
              <div key={item.id} className="inline-flex space-x-4">
                <input
                  {...register(`${item.id}`)}
                  id={`${item.name}${item.type ? '-' + item.type : ''}`}
                  type="checkbox"
                />
                <label
                  htmlFor={`${item.name}${item.type ? '-' + item.type : ''}`}
                >{`${item.name}${item.type ? '-' + item.type : ''}`}</label>
              </div>
            ))}
          <h3>Vegetables</h3>
          {dietItems
            ?.filter(
              (item: DietItem) => item.diet_category.name === 'Vegetables'
            )
            ?.map((item: DietItem) => (
              <div key={item.id} className="inline-flex space-x-4">
                <input
                  {...register(`${item.id}`)}
                  id={`${item.name}${item.type ? '-' + item.type : ''}`}
                  type="checkbox"
                />
                <label
                  htmlFor={`${item.name}${item.type ? '-' + item.type : ''}`}
                >{`${item.name}${item.type ? '-' + item.type : ''}`}</label>
              </div>
            ))}
          <h3>Fats</h3>
          {dietItems
            ?.filter((item: DietItem) => item.diet_category.name === 'Fats')
            ?.map((item: DietItem) => (
              <div key={item.id} className="inline-flex space-x-4">
                <input
                  {...register(`${item.id}`)}
                  id={`${item.name}${item.type ? '-' + item.type : ''}`}
                  type="checkbox"
                />
                <label
                  htmlFor={`${item.name}${item.type ? '-' + item.type : ''}`}
                >{`${item.name}${item.type ? '-' + item.type : ''}`}</label>
              </div>
            ))}
          <h3>Fruits</h3>
          {dietItems
            ?.filter((item: DietItem) => item.diet_category.name === 'Fruits')
            ?.map((item: DietItem) => (
              <div key={item.id} className="inline-flex space-x-4">
                <input
                  {...register(`${item.id}`)}
                  id={`${item.name}${item.type ? '-' + item.type : ''}`}
                  type="checkbox"
                />
                <label
                  htmlFor={`${item.name}${item.type ? '-' + item.type : ''}`}
                >{`${item.name}${item.type ? '-' + item.type : ''}`}</label>
              </div>
            ))}
          <h3>Supplements</h3>
          {dietItems
            ?.filter(
              (item: DietItem) => item.diet_category.name === 'Supplements'
            )
            ?.map((item: DietItem) => (
              <div key={item.id} className="inline-flex space-x-4">
                <input
                  {...register(`${item.id}`)}
                  id={`${item.name}${item.type ? '-' + item.type : ''}`}
                  type="checkbox"
                />
                <label
                  htmlFor={`${item.name}${item.type ? '-' + item.type : ''}`}
                >{`${item.name}${item.type ? '-' + item.type : ''}`}</label>
              </div>
            ))}
          <h3>Drinks</h3>
          {dietItems
            ?.filter((item: DietItem) => item.diet_category.name === 'Drinks')
            ?.map((item: DietItem) => (
              <div key={item.id} className="inline-flex space-x-4">
                <input
                  {...register(`${item.id}`)}
                  id={`${item.name}${item.type ? '-' + item.type : ''}`}
                  type="checkbox"
                />
                <label
                  htmlFor={`${item.name}${item.type ? '-' + item.type : ''}`}
                >{`${item.name}${item.type ? '-' + item.type : ''}`}</label>
              </div>
            ))}
        </div>

        <input disabled={isFormSubmitting} type="submit" />
      </form>
    </div>
  );
};

export default CreateMealPlanPage;
