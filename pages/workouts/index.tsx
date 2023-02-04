import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/20/solid';

export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

const MealPlanPage = ({ user }: { user: User }) => {
  console.log(user);
  const mealPlans = [
    { id: 12356234124, name: 'My first AI generated meal plan' },
    { id: 12858713283, name: 'My second AI generated meal plan' }
  ];
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
        Work Outs
      </h1>
      {mealPlans.length > 0 &&
        mealPlans.map((element, index, array) => (
          <div
            key={element?.id}
            className="flex justify-between px-8 py-2 my-2 border-2 rounded-lg border-white"
          >
            <div>{element?.name}</div>
            <Link href={`/workouts/${element?.id}`}>View</Link>
          </div>
        ))}
      <button>
        <Link className="cursor-pointer" href={`/workouts/create-new`}>
          <div className="flex flex-col items-center mb-10 border-2 rounded-lg border-green-400">
            <h2 className="text-4xl font-extrabold text-white sm:text-center sm:text-2xl text-green-400">
              Create New Work Out
            </h2>
            <PlusCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
          </div>
        </Link>
      </button>
    </div>
  );
};

export default MealPlanPage;
