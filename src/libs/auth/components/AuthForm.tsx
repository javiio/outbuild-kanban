'use client';

import React, { useState } from 'react';
import { Input, Button, Logo, Text } from '@/core/ui';
import { useAuth } from '@/auth';

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
      <div className="my-6 mx-20">
        <Logo />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 bg-white/5 px-4 py-12 rounded">
          {mode === AuthMode.Signup && (
            <div>
              <Text.Label>Name</Text.Label>
              <Input
                variant='secondary'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <Text.Label>Email</Text.Label>
            <Input
              variant='secondary'
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Text.Label>Password</Text.Label>
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
            <Text.P>
              {mode === AuthMode.Login ? 'Don\'t have an account?' : 'Already have an account?'}
            </Text.P>
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
