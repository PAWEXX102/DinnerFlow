import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

const menuSchema = Yup.object({
    Name:Yup.string().nullable(),
    Description:Yup.string().nullable(),
})


export const menuValidation = () => useForm({
    resolver:yupResolver(menuSchema)
});
