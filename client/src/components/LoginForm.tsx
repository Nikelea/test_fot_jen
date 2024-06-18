import { Alert, Form, FormInstance, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { UserRequest, loginUser } from '@/features/userSlice';
import { UserContext } from '@/hooks/auth';

interface Props {
  form: FormInstance;
  closeModal: () => void;
}

export function LoginForm({ form, closeModal }: Props) {
  const dispatch = useAppDispatch();
  const { loading, loginError } = useAppSelector((state) => state.user);

  const [submited, setSubmited] = useState(false);

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!loading && submited && !loginError) {
      userContext.setToken('abc');
      form.resetFields();
      closeModal();
    }
  }, [loading, submited]);

  const onFinish = (values: UserRequest) => {
    dispatch(loginUser(values));
    setSubmited(true);
  };

  return (
    <>
      <Form name="login-form" onFinish={onFinish} form={form}>
        {loginError ? (
          <Form.Item>
            <Alert message={loginError} type="error" />
          </Form.Item>
        ) : null}
        <Form.Item name="username">
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
      </Form>
    </>
  );
}
