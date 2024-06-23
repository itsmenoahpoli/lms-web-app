import React from "react";
import { Card, Form, Input, Button } from "antd";

const LoginPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <Card className="w-[350px] border border-gray-200 shadow-md">
        <h1 className="text-xl text-center font-bold mb-4">SIGN IN</h1>

        <Form layout="vertical">
          <Form.Item label="E-mail Address">
            <Input type="email" autoFocus />
          </Form.Item>
          <Form.Item label="Password">
            <Input type="password" />
            <div className="flex justify-end mt-1">
              <a href="#" className="text-xs text-blue-700 underline">
                Forgot your password?
              </a>
            </div>
          </Form.Item>

          <Button type="primary" className="h-[40px]" block>
            Sign In
          </Button>
        </Form>
      </Card>

      <div className="flex flex-row gap-x-4 justify-between text-xs text-blue-700 underline">
        <a href="#">Terms and Conditions</a>
        <a href="#">Policy</a>
        <a href="#">Report a Bug</a>
        <a href="#">About</a>
      </div>
    </div>
  );
};

export default LoginPage;
