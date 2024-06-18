import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { Flex, Modal, Form } from 'antd';
import { useState } from 'react';

interface Props {
  type: 'register' | 'login';
}

export function AuthModal({ type }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (e) {
      console.error('Failed to submit form:', e);
    }
  };

  const buttonText = type === 'register' ? 'Register' : 'Login';

  return (
    <>
      <a onClick={showModal}>{buttonText}</a>
      <Modal
        title={type === 'register' ? 'Registration' : 'Login'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={buttonText}
      >
        <Flex gap="middle" align="start" justify="center">
          {type === 'register' ? (
            <RegisterForm
              form={form}
              closeModal={() => {
                setIsModalOpen(false);
              }}
            />
          ) : (
            <LoginForm
              form={form}
              closeModal={() => {
                setIsModalOpen(false);
              }}
            />
          )}
        </Flex>
      </Modal>
    </>
  );
}
