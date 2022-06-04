import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGroupsState } from "../../../store/selectors";
import FormAddGroup from "../FormAddGroup";
import Group from "./Group";

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
`;

export default Groups;
