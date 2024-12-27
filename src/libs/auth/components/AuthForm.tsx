'use client';

import React, { useState } from 'react';
import { useAuth } from '@/auth';
import { Input, Button, Logo } from '@/core/ui';

enum AuthMode {
  Login = 'login',
  Signup = 'signup',
}

export const AuthForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>(AuthMode.Login);
  const { login, signup, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === AuthMode.Login) {
      login(email, password);
    } else {
      signup(name, email, password);
    }
  };

  return (
    <div className="w-96">
      <div className="m-8">
        <Logo />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 bg-white/5 px-4 py-12 rounded">
          {mode === AuthMode.Signup && (
            <div>
              <span>Name</span>
              <Input
                variant='secondary'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <span>Email</span>
            <Input
              variant='secondary'
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <span>Password</span>
            <Input
              variant='secondary'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            {mode === AuthMode.Login ? 'Login' : 'Sign up'}
          </Button>

          <div className="flex space-x-2 items-center justify-center">
            <span>
              {mode === AuthMode.Login ? 'Don\'t have an account?' : 'Already have an account?'}
            </span>
            <Button
              onClick={() => setMode(mode === AuthMode.Login ? AuthMode.Signup : AuthMode.Login)}
              variant="link"
              className="!px-2"
            >
              {mode === AuthMode.Login ? 'Sign up' : 'Login'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
