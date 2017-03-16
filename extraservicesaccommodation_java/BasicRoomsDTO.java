package com.connectflexi.backoffice.dto.extraservicesaccommodation;

import java.util.List;
import java.util.stream.Collectors;
import com.connectflexi.backoffice.model.BasicRoom;

public class BasicRoomsDTO {
	
	private String id;
	private String name;
	
	public BasicRoomsDTO()
	{
		
	}
	
	public BasicRoomsDTO(String id, String name) {
		this.id = id;
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public static BasicRoomsDTO mapBasicRoomsEntity(BasicRoom basicRoom) {
		BasicRoomsDTO basicRoomsDTO = new BasicRoomsDTO();
		basicRoomsDTO.setId(basicRoom.getId());
		basicRoomsDTO.setName(basicRoom.getName());
		return basicRoomsDTO;
	}

	public static List<BasicRoomsDTO> mapBasicRoomsEntities(List<BasicRoom> basicRooms) {
		return basicRooms.stream().map((basicRoom) -> mapBasicRoomsEntity(basicRoom)).collect(Collectors.toList());
	}
}
