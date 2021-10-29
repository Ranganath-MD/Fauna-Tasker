import useSWRImmutable, { useSWRConfig } from "swr";
import Edit3 from "@geist-ui/react-icons/edit3";
import X from "@geist-ui/react-icons/x";

import React, { useCallback, useState } from "react";
import {
  create,
  deleteQuery,
  fetcher,
  mutateTask,
  query,
  update,
} from "../utils/requests";
import { Layout } from "../components/layout/Layout";
import {
  Button,
  Spacer,
  Table,
  Text,
} from "@geist-ui/react";
import { Plus } from "@geist-ui/react-icons";
import { FormModal } from "../components/FormModal";

const Home = () => {
  const { mutate } = useSWRConfig();
  const [updateState, setUpdate] = useState({
    id: "",
    status: false,
    data: null,
  });
  const [open, setOpen] = useState(false);

  const {
    data,
    error,
    mutate: get,
  } = useSWRImmutable(query, fetcher);

  const onClose = useCallback(() => {
    setUpdate({
      id: "",
      status: false,
      data: null,
    });
    setOpen(false);
  }, []);

  const onSubmit = async (data: any) => {
    const { title, sprint, week } = data;
    if (updateState.id) {
      const variables = {
        id: updateState.id,
        title,
        sprint: parseInt(sprint),
        week: parseInt(week),
      };

      try {
        await mutate(update, mutateTask(update, variables));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await mutate(
          create,
          mutateTask(create, {
            title,
            sprint: parseInt(sprint),
            week: parseInt(week),
          })
        );
      } catch (error) {
        console.error(error);
      }
    }
    setOpen(false);
    get();
    setUpdate({
      id: "",
      status: false,
      data: null,
    });
  };

  const handleUpdate = async (task: any) => {
    setOpen(true);
    setUpdate({
      id: task._id,
      status: true,
      data: task,
    });
  };

  const handleDelete = async (task: any) => {
    const variable = {
      id: task._id,
    };
    try {
      await mutate(
        deleteQuery,
        mutateTask(deleteQuery, variable)
      );
      get();
    } catch (error) {
      console.error(error);
    }
  };

  const renderAction = (_: any, rowData: any) => {
    return (
      <>
        <Button
          icon={<Edit3 />}
          auto
          type="success"
          scale={1 / 3}
          px={0.6}
          onClick={() => handleUpdate(rowData)}
        >
          Edit
        </Button>
        <Spacer w={1} inline />
        <Button
          icon={<X />}
          type="error"
          auto
          scale={1 / 3}
          px={0.6}
          onClick={() => handleDelete(rowData)}
        >
          Delete
        </Button>
      </>
    );
  };

  if (error) return <div>failed to load</div>;
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text h2>Tasks</Text>
        <Button
          icon={<Plus />}
          auto
          scale={0.5}
          type="success"
          onClick={() => setOpen(true)}
        >
          Create
        </Button>
      </div>
      <Spacer w={1} />
      <Table
        data={data?.allTasks.data}
        initialData={[]}
        emptyText="Nothing to see"
      >
        <Table.Column prop="title" label="Title" />
        <Table.Column
          prop="sprint"
          label="Sprint"
          width={100}
        />
        <Table.Column
          prop="week"
          label="Week"
          width={100}
        />
        <Table.Column
          prop=""
          label="Actions"
          render={renderAction}
          width={150}
        />
      </Table>
      <FormModal
        open={open}
        onSubmit={onSubmit}
        onClose={onClose}
        onCancel={() => setOpen(false)}
        data={updateState.data}
        headerText={
          updateState.status ? "Edit Task" : "Create Task"
        }
      />
    </Layout>
  );
};

export default Home;
