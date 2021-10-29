import {
  Modal,
  Input,
  Spacer,
  Textarea,
} from "@geist-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const FormModal = ({
  open,
  onClose,
  onSubmit,
  headerText,
  data,
}: any) => {

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const handleClose = () => {
    reset();
    clearErrors(["title", "sprint", "week"]);
    onClose();
  };

  return (
    <>
      <Modal visible={open} onClose={handleClose}>
        <Modal.Title>{headerText}</Modal.Title>
        <Modal.Content>
          <form>
            <Controller
              name="title"
              control={control}
              defaultValue={data ? data.title : ""}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Task title"
                  width="100%"
                  type={
                    errors?.title ? "error" : "secondary"
                  }
                />
              )}
            />

            <Spacer h={0.5} />
            <Controller
              name="sprint"
              control={control}
              defaultValue={data ? data.sprint : ""}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  htmlType="number"
                  label="Sprint"
                  placeholder="Enter Sprint"
                  width="100%"
                  type={
                    errors?.sprint ? "error" : "secondary"
                  }
                />
              )}
            />
            <Spacer h={0.5} />
            <Controller
              name="week"
              control={control}
              defaultValue={data ? data.week : ""}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Week"
                  htmlType="number"
                  placeholder="Enter Week"
                  width="100%"
                  type={
                    errors?.week ? "error" : "secondary"
                  }
                />
              )}
            />
            <Spacer h={0.5} />
            {/* <input
              {...register("title", { required: true })}
            />
            <input
              {...register("sprint", { required: true })}
              type="number"
            />
            <input
              {...register("week", { required: true })}
              type="number"
            /> */}
            {/* <input type="submit" name="submit" /> */}
          </form>
        </Modal.Content>
        <Modal.Action passive onClick={onClose}>
          Cancel
        </Modal.Action>
        <Modal.Action
          htmlType="submit"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Submit
        </Modal.Action>
      </Modal>
    </>
  );
};
