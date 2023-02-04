import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/20/solid';

export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

const MealPlanDetailPage = ({ user }: { user: User }) => {
  console.log(user);
  const mealPlans = [
    { id: 12356234124, name: 'My first AI generated meal plan' },
    { id: 12858713283, name: 'My second AI generated meal plan' }
  ];
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
        Meal Plans Detail
      </h1>
    </div>
  );
};

export default MealPlanDetailPage;
