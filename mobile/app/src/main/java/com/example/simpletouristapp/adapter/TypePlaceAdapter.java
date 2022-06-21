package com.example.simpletouristapp.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.model.TypePlace;
import com.example.simpletouristapp.service.ToursApiService;
import com.google.android.material.chip.Chip;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TypePlaceAdapter extends RecyclerView.Adapter<TypePlaceAdapter.TypePlaceViewHolder>{

    private Context context;
    private List<TypePlace> typePlaces;
    private Set<String> selectedTypePlace;

    public TypePlaceAdapter(Context context, List<TypePlace> typePlaces, Set<String> selectedTypePlace) {
        this.context = context;
        this.typePlaces = typePlaces;
        this.selectedTypePlace = selectedTypePlace;
    }

    @NonNull
    @Override
    public TypePlaceViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_chip_type_place, parent, false);
        return new TypePlaceViewHolder(view);
    }

    @SuppressLint("NewApi")
    @Override
    public void onBindViewHolder(@NonNull TypePlaceViewHolder holder, int position) {
        TypePlace typePlace = typePlaces.get(position);

        holder.checkTypePlace.setText(typePlace.getName());
        holder.checkTypePlace.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                if(b){
                    for (TypePlace typePlace: typePlaces){
                        if(typePlace.getName().equals(compoundButton.getText().toString())){
                            selectedTypePlace.add(typePlace.getSlug());
                        }
                    }

                }else {
                    for (TypePlace typePlace: typePlaces){
                        if(typePlace.getName().equals(compoundButton.getText().toString())){
                            selectedTypePlace.remove(typePlace.getSlug());
                        }
                    }
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return typePlaces == null ? 0 : typePlaces.size();
    }

    public class TypePlaceViewHolder extends RecyclerView.ViewHolder{
        private Chip checkTypePlace;

        public TypePlaceViewHolder(@NonNull View itemView){
            super(itemView);
            checkTypePlace = itemView.findViewById(R.id.item_type_place);
        }
    }
}
