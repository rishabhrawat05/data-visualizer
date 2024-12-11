package com.datavisualizer.data_visualizer_backend.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.datavisualizer.data_visualizer_backend.exceptions.FileIsEmptyException;

@Service
public class UploadService {

	public List<Map<String,String>> addFile(MultipartFile file) throws IOException{
		if(file.isEmpty()) {
			throw new FileIsEmptyException("File is empty");
		}
		List<Map<String, String>> records = new ArrayList<>();
		BufferedReader bufferReader = new BufferedReader(new InputStreamReader(file.getInputStream()));
		String line;
		String[] headers = bufferReader.readLine().split(",");
		while((line = bufferReader.readLine()) != null) {
			if (line.trim().isEmpty()) {
                 continue;
             }
			String[] values = line.split(",");
			Map<String, String> map = new HashMap<String, String>();
			for(int i = 0; i < headers.length; i++) {
				if (i < values.length) {
                   map.put(headers[i], values[i]);
                }
				else {
                   map.put(headers[i], ""); 
                }
			}
			records.add(map);
		}
		return records;
	}
}
