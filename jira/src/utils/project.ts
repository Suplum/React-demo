import { AsyncResource } from "async_hooks";
import { useEffect } from "react";
import {Project} from 'screens/project-list/list'
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>()

  const fetchProjects = () => client("projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(
      fetchProjects(), {
        retry: fetchProjects
      }
    )
  }, [param]);

  return result;
}

export const useEditProject = () => {
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}
