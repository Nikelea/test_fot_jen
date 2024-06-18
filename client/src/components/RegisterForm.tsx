import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, FormInstance, Input } from 'antd';
import { useEffect, useState } from 'react';
import { UserRequest, registerUser } from '@/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';

interface Props {
  form: FormInstance;
  closeModal: () => void;
}

export function RegisterForm({ form, closeModal }: Props) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => state.user.registerError);
  const loading = useAppSelector((state) => state.user.loading);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    if (!loading && submited) {
      if (Array.isArray(errors)) {
        const fieldsError = errors.map((err) => {
          return { name: err.type, errors: err.message };
        });
        form.setFields(fieldsError);
      } else {
        form.resetFields();
        closeModal();
      }
    }
  }, [loading, submited]);

  const onFinish = (values: UserRequest) => {
    dispatch(registerUser(values));
    setSubmited(true)
  };

  return (
    <Form name="register-form" onFinish={onFinish} form={form}>
      <Form.Item
        name="username"
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
    </Form>
  );
}
