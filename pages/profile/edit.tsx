import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useMutation from '@libs/client/useMutation';
import Image from 'next/image';

interface IEditProfileForm {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface IEditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IEditProfileForm>();
  useEffect(() => {
    if (user?.name) setValue('name', user.name);
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/Y45BUDi393Qe7-mR-gFRlA/${user?.avatar}/avatar`
      );
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<IEditProfileResponse>(`/api/users/me`);
  const onValid = async ({ name, email, phone, avatar }: IEditProfileForm) => {
    if (loading) return;
    if (name === '' && email === '' && phone === '') {
      return setError('formErrors', {
        message: '이메일이나 전화번호 중 하나는 필수입니다.',
      });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/uploads`)).json();
      const form = new FormData();
      form.append('file', avatar[0], String(user.id));
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      editProfile({
        name,
        email,
        phone,
        avatarId: id,
      });
    } else {
      editProfile({
        name,
        email,
        phone,
      });
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('formErrors', { message: data.error });
    }
  }, [data, setError]);
  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('avatar');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout title="프로필 수정" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <div className="relative h-14 w-14 rounded-full bg-slate-500">
              <Image
                src={avatarPreview}
                layout="fill"
                className="rounded-full object-cover"
                alt="Avatar"
              />
            </div>
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            변경
            <input
              {...register('avatar')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register('name')}
          name="name"
          label="이름"
          type="text"
        />
        <Input
          register={register('email')}
          name="email"
          label="이메일 주소"
          type="email"
        />
        <Input
          register={register('phone')}
          name="phone"
          label="휴대폰 번호"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 block text-center font-semibold text-red-500">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button isLoading={loading} text="프로필 수정하기" />
      </form>
    </Layout>
  );
};

export default EditProfile;
