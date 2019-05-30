import { _internal } from "../action-link";
import Enzyme, { mount } from "enzyme";
import ezJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import React from "react";
import PropTypes from "prop-types";

const Link = _internal.ActionLink(React, PropTypes);

it("dispatches an action on click", () => {
  // given
  const store = {
    pathForAction: jest.fn(() => "/my/path"),
    dispatch: jest.fn()
  };
  const props = {
    action: { type: "ACTION", id: "123" },
    children: "Hello World!"
  };
  const context = { store };

  const wrapper = mount(Link(props, context));
  // when
  wrapper.simulate("click");

  //then
  expect(store.pathForAction.mock.calls).toEqual([
    [{ type: "ACTION", id: "123" }]
  ]);
  expect(store.dispatch.mock.calls).toEqual([[{ type: "ACTION", id: "123" }]]);
});

it("renders the url calculated by our internal function", () => {
  // given
  const store = {
    pathForAction: jest.fn(() => "/my/path"),
    dispatch: jest.fn()
  };
  const props = {
    action: {},
    children: "Hello World!"
  };
  const context = { store };

  const wrapper = mount(Link(props, context));

  expect(ezJson(wrapper)).toMatchSnapshot();
});

it("additional props are passed through", () => {
  // given
  const store = {
    pathForAction: jest.fn(() => "/my/path"),
    dispatch: jest.fn()
  };
  const props = {
    action: {},
    children: "Hello World!",
    className: "foo"
  };
  const context = { store };

  const wrapper = mount(Link(props, context));

  expect(ezJson(wrapper)).toMatchSnapshot();
});
