// 'use client';

// import SimpleMDE from "react-simplemde-editor";
// import {useForm, Controller} from 'react-hook-form'
// import "easymde/dist/easymde.min.css";
// import {TextField, Button, Callout, Text} from '@radix-ui/themes'
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createIssueSchema } from "@/app/validationSchema";
// import { z } from 'zod';
// import ErrorMessage from "@/app/components/ErrorMessage";
// import { Spinner } from "@/app/components/Spinner";
// import { useEffect } from "react";



// type IssueForm = z.infer<typeof createIssueSchema>;

// const NewIssuePage = () => {
//   const router = useRouter();
//   const {register, control, handleSubmit, formState: { errors }} = useForm <IssueForm>({
//     resolver: zodResolver(createIssueSchema)
//   });
//   const [error, setError ] = useState ('');
//   const [ isSubmitting, setSubmitting ] = useState (false);
//   console.log(register('title'))
//   useEffect (() => {
//     if (typeof window !== 'undefined') {
      
//     }
//   })
//   return (
//     <div className="max-w-xl">
//       {error && <Callout.Root color="red" className="mb-5"><Callout.Text>{error}</Callout.Text></Callout.Root>}
//     <form 
//     className='space-y-4' 
//     onSubmit={handleSubmit(async (data) => {
//       try {
//         setSubmitting(true);
//         await axios.post('/issues', data);
//     router.push('/issues');
//       } catch (error) {
//         setSubmitting(false);
//         setError('An unexpected Error Occured.');
//       }
       
//     })}>
//         <TextField.Root>
//         <TextField.Input placeholder='Title' {...register('title')}/> 
//         </TextField.Root>
       
//         <ErrorMessage 
//         >{errors.title?.message}
//         </ErrorMessage>
//         <Controller
//         name="description"
//         control={control}
//         render={({field}) => <SimpleMDE placeholder='Description' {...field}/>
//       }
//         />
//         <ErrorMessage 
//         >{errors.description?.message}
//         </ErrorMessage>

//         <Button disabled={isSubmitting}>Submit new issue {isSubmitting && <Spinner/>} </Button>
//         </form>
//         </div>
//   )
// }

// export default NewIssuePage


import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { TextField, Button, Callout } from '@radix-ui/themes';
import axios from 'axios';
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  // Function to handle form submission asynchronously
  const submitForm = async (data: IssueForm) => {
    try {
      setSubmitting(true);
      await axios.post('/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected Error Occurred.');
    }
  };

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== 'undefined') {
      // Your client-side code that uses navigator can go here
      // For example, you might want to perform some initialization or checks
    }
  }, []); // Run this effect only once on component mount

  return (
    <div className="max-w-xl">
      {error && <Callout.Root color="red" className="mb-5"><Callout.Text>{error}</Callout.Text></Callout.Root>}
      <form
        className='space-y-4'
        onSubmit={handleSubmit(async (data) => {
          // Call the submitForm function to handle form submission
          await submitForm(data);
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>Submit new issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
