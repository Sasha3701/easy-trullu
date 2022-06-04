import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { selectGroupsState } from "../../../store/selectors";
import FormAddGroup from "../../FormAddGroup";
import Group from "./Group";

const animGroup = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Groups = () => {
  const groups = useSelector(selectGroupsState);

  return (
    <SContainer>
      {groups.length ? (
        <SListGroups>
          {groups.map((group) => (
            <SItemGroups key={group.id}>
              <Group group={group} />
            </SItemGroups>
          ))}
        </SListGroups>
      ) : null}
      <FormAddGroup />
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
`;

const SListGroups = styled.ul`
  display: flex;
  list-style: none;
`;

const SItemGroups = styled.li`
  margin-right: 10px;
  animation: ${animGroup} 0.8s;
`;

export default Groups;
