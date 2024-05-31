/* eslint-disable */
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<CreateCommentPayload>;
  createPost?: Maybe<CreatePostPayload>;
  createTodo?: Maybe<CreateTodoPayload>;
  createUser?: Maybe<CreateUserPayload>;
  deleteComment?: Maybe<DeleteCommentPayload>;
  deletePost?: Maybe<DeletePostPayload>;
  deleteTodo?: Maybe<DeleteTodoPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  updateComment?: Maybe<UpdateCommentPayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  updateTodo?: Maybe<UpdateTodoPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


export type MutationDeleteTodoArgs = {
  input: DeleteTodoInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Find a comment by ID */
  comment?: Maybe<Comment>;
  /** List of comments */
  comments: CommentConnection;
  /** Find a post by ID */
  post?: Maybe<Post>;
  /** List of posts */
  posts: PostConnection;
  /** Find a todo by ID */
  todo?: Maybe<Todo>;
  /** List of todos */
  todos: TodoConnection;
  /** Find a user by ID */
  user?: Maybe<User>;
  /** List of users */
  users: UserConnection;
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTodoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTodosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Comment = {
  __typename?: 'comment';
  body?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  post: Post;
  postId: Scalars['Int']['output'];
};

/** The connection type for comment. */
export type CommentConnection = {
  __typename?: 'commentConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CommentEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of items */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CommentEdge = {
  __typename?: 'commentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Comment>;
};

/** Autogenerated input type of createComment */
export type CreateCommentInput = {
  body: Scalars['String']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};

/** Autogenerated return type of createComment */
export type CreateCommentPayload = {
  __typename?: 'createCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
};

/** Autogenerated input type of createPost */
export type CreatePostInput = {
  body: Scalars['String']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

/** Autogenerated return type of createPost */
export type CreatePostPayload = {
  __typename?: 'createPostPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Post>;
};

/** Autogenerated input type of createTodo */
export type CreateTodoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  dueOn: Scalars['ISO8601DateTime']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

/** Autogenerated return type of createTodo */
export type CreateTodoPayload = {
  __typename?: 'createTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  todo?: Maybe<Todo>;
};

/** Autogenerated input type of createUser */
export type CreateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

/** Autogenerated return type of createUser */
export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

/** Autogenerated input type of deleteComment */
export type DeleteCommentInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** Autogenerated return type of deleteComment */
export type DeleteCommentPayload = {
  __typename?: 'deleteCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
};

/** Autogenerated input type of deletePost */
export type DeletePostInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** Autogenerated return type of deletePost */
export type DeletePostPayload = {
  __typename?: 'deletePostPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Post>;
};

/** Autogenerated input type of deleteTodo */
export type DeleteTodoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** Autogenerated return type of deleteTodo */
export type DeleteTodoPayload = {
  __typename?: 'deleteTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  todo?: Maybe<Todo>;
};

/** Autogenerated input type of deleteUser */
export type DeleteUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** Autogenerated return type of deleteUser */
export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Post = {
  __typename?: 'post';
  body: Scalars['String']['output'];
  /** List of comments */
  comments: CommentConnection;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};


export type PostCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for post. */
export type PostConnection = {
  __typename?: 'postConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of items */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostEdge = {
  __typename?: 'postEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Post>;
};

export type Todo = {
  __typename?: 'todo';
  dueOn?: Maybe<Scalars['ISO8601DateTime']['output']>;
  id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

/** The connection type for todo. */
export type TodoConnection = {
  __typename?: 'todoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TodoEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Todo>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of items */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type TodoEdge = {
  __typename?: 'todoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Todo>;
};

/** Autogenerated input type of updateComment */
export type UpdateCommentInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated return type of updateComment */
export type UpdateCommentPayload = {
  __typename?: 'updateCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
};

/** Autogenerated input type of updatePost */
export type UpdatePostInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated return type of updatePost */
export type UpdatePostPayload = {
  __typename?: 'updatePostPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Post>;
};

/** Autogenerated input type of updateTodo */
export type UpdateTodoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  dueOn?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  id: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated return type of updateTodo */
export type UpdateTodoPayload = {
  __typename?: 'updateTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  todo?: Maybe<Todo>;
};

/** Autogenerated input type of updateUser */
export type UpdateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of updateUser */
export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'user';
  email: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** List of posts */
  posts: PostConnection;
  status: Scalars['String']['output'];
  /** List of todos */
  todos: TodoConnection;
};


export type UserPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type UserTodosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for user. */
export type UserConnection = {
  __typename?: 'userConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of items */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'userEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<CreateCommentPayload>;
  createPost?: Maybe<CreatePostPayload>;
  createTodo?: Maybe<CreateTodoPayload>;
  createUser?: Maybe<CreateUserPayload>;
  deleteComment?: Maybe<DeleteCommentPayload>;
  deletePost?: Maybe<DeletePostPayload>;
  deleteTodo?: Maybe<DeleteTodoPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  updateComment?: Maybe<UpdateCommentPayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  updateTodo?: Maybe<UpdateTodoPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


export type MutationDeleteTodoArgs = {
  input: DeleteTodoInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Find a comment by ID */
  comment?: Maybe<Comment>;
  /** List of comments */
  comments: CommentConnection;
  /** Find a post by ID */
  post?: Maybe<Post>;
  /** List of posts */
  posts: PostConnection;
  /** Find a todo by ID */
  todo?: Maybe<Todo>;
  /** List of todos */
  todos: TodoConnection;
  /** Find a user by ID */
  user?: Maybe<User>;
  /** List of users */
  users: UserConnection;
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTodoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTodosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Comment = {
  __typename?: 'comment';
  body?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  post: Post;
  postId: Scalars['Int']['output'];
};

/** The connection type for comment. */
export type CommentConnection = {
  __typename?: 'commentConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CommentEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of items */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CommentEdge = {
  __typename?: 'commentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Comment>;
};

/** Autogenerated input type of createComment */
export type CreateCommentInput = {
  body: Scalars['String']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};

/** Autogenerated return type of createComment */
export type CreateCommentPayload = {
  __typename?: 'createCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
};

/** Autogenerated input type of createPost */
export type CreatePostInput = {
  body: Scalars['String']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

/** Autogenerated return type of createPost */
export type CreatePostPayload = {
  __typename?: 'createPostPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Post>;
};

/** Autogenerated input type of createTodo */
export type CreateTodoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  dueOn: Scalars['ISO8601DateTime']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

/** Autogenerated return type of createTodo */
export type CreateTodoPayload = {
  __typename?: 'createTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  todo?: Maybe<Todo>;
};

/** Autogenerated input type of createUser */
export type CreateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

/** Autogenerated return type of createUser */
export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

/** Autogenerated input type of deleteComment */
export type DeleteCommentInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** Autogenerated return type of deleteComment */
export type DeleteCommentPayload = {
  __typename?: 'deleteCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
};

/** Autogenerated input type of deletePost */
export type DeletePostInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** Autogenerated return type of deletePost */
export type DeletePostPayload = {
  __typename?: 'deletePostPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Post>;
};

/** Autogenerated input type of deleteTodo */
export type DeleteTodoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** Autogenerated return type of deleteTodo */
export type DeleteTodoPayload = {
  __typename?: 'deleteTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  todo?: Maybe<Todo>;
};

/** Autogenerated input type of deleteUser */
export type DeleteUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** Autogenerated return type of deleteUser */
export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Post = {
  __typename?: 'post';
  body: Scalars['String']['output'];
  /** List of comments */
  comments: CommentConnection;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};


export type PostCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for post. */
export type PostConnection = {
  __typename?: 'postConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of items */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type PostEdge = {
  __typename?: 'postEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Post>;
};

export type Todo = {
  __typename?: 'todo';
  dueOn?: Maybe<Scalars['ISO8601DateTime']['output']>;
  id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

/** The connection type for todo. */
export type TodoConnection = {
  __typename?: 'todoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TodoEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Todo>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of items */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type TodoEdge = {
  __typename?: 'todoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Todo>;
};

/** Autogenerated input type of updateComment */
export type UpdateCommentInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated return type of updateComment */
export type UpdateCommentPayload = {
  __typename?: 'updateCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
};

/** Autogenerated input type of updatePost */
export type UpdatePostInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated return type of updatePost */
export type UpdatePostPayload = {
  __typename?: 'updatePostPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Post>;
};

/** Autogenerated input type of updateTodo */
export type UpdateTodoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  dueOn?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  id: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated return type of updateTodo */
export type UpdateTodoPayload = {
  __typename?: 'updateTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  todo?: Maybe<Todo>;
};

/** Autogenerated input type of updateUser */
export type UpdateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of updateUser */
export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'user';
  email: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** List of posts */
  posts: PostConnection;
  status: Scalars['String']['output'];
  /** List of todos */
  todos: TodoConnection;
};


export type UserPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type UserTodosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for user. */
export type UserConnection = {
  __typename?: 'userConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of items */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'userEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};
