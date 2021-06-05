import { useState } from 'react';
import { supabase } from '@/supabaseClient';
import Header from '../header';

export default function Auth() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn(
        { email },
        { redirectTo: window.location.origin + '/admin' },
      );
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="admin" />

      <form
        className="max-w-5xl my-0 mx-auto mt-8 prose lg:prose-xl"
        onSubmit={(e) => {
          e.preventDefault();

          const data = new FormData(e.currentTarget);
          const email = data.get('email') as string;

          handleLogin(email);
        }}
      >
        <h1 className="">Sign In with magic link</h1>

        <label className="flex flex-col">
          <span className="text-2xl">Email</span>

          <input
            className="form-input text-xl h-14 px-0 border-0 border-b-2 focus:border-purple-700 focus:ring-0"
            type="email"
            placeholder="Your email"
            name="email"
          />
        </label>

        <button
          className="bg-purple-700 text-white py-2 w-56 rounded-full font-semibold mt-8"
          disabled={loading}
        >
          {loading ? <span>Loading</span> : <span>Send magic link</span>}
        </button>
      </form>
    </>
  );
}
