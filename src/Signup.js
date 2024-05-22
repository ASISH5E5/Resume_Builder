import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './Firebase.js';
import * as Components from './comps.js';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Store user details in Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: name,
        email: email,
      });

      alert('User registered successfully');
      navigate('/', { state: { email: email } });
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('No user found with this email.');
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      alert('User signed in successfully');
      navigate('/', { state: { email: email } });
    } catch (error) {
      console.error("Error signing in:", error);
      alert(error.message);
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignIn}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start your journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default LoginForm;
