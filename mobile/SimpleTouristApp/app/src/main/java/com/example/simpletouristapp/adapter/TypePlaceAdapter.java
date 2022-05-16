package com.example.simpletouristapp.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.DomesticFragmentBinding;
import com.example.simpletouristapp.model.Tour;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.model.TypePlace;
import com.example.simpletouristapp.service.ToursApiService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TypePlaceAdapter extends RecyclerView.Adapter<TypePlaceAdapter.TypePlaceViewHolder>{

    private Context context;
    private List<TypePlace> typePlaces;
    private boolean isSelected = true;

    private RecyclerView rvDomesticTour;
    private ToursApiService toursApiService;

    public TypePlaceAdapter(Context context, List<TypePlace> typePlaces, RecyclerView rvDomesticTour) {
        this.context = context;
        this.typePlaces = typePlaces;
        this.rvDomesticTour = rvDomesticTour;
    }



    @NonNull
    @Override
    public TypePlaceViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_type_place, parent, false);
        return new TypePlaceViewHolder(view);
    }

    @SuppressLint("NewApi")
    @Override
    public void onBindViewHolder(@NonNull TypePlaceViewHolder holder, int position) {
        TypePlace typePlace = typePlaces.get(position);

        holder.btnTypePlace.setText(typePlace.getName());

        if(!isSelected){
            holder.btnTypePlace.setBackgroundTintList(ColorStateList.valueOf(context.getColor(R.color.white)));
        }
        holder.itemView.getId();
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @SuppressLint("NewApi")
            @Override
            public void onClick(View view) {

                isSelected = false;
                holder.btnTypePlace.setBackgroundTintList(ColorStateList.valueOf(context.getColor(R.color.blue)));
                toursApiService = new ToursApiService();
                try {
                    Call<ToursResponse> call = toursApiService.getToursByTypePlace(typePlace.getSlug());
                    call.enqueue(new Callback<ToursResponse>() {
                        @Override
                        public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                            if(response.code() == 200){
                                Log.d("TAG",response.code()+""+view.getId());
                                ToursResponse tourResponse = response.body();
                                TourAdapter tourAdapter = new TourAdapter(context,tourResponse.getData());
                                rvDomesticTour.setLayoutManager(new GridLayoutManager(context,2));
                                rvDomesticTour.setAdapter(tourAdapter);
                            }else {
                                TourAdapter tourAdapter = new TourAdapter(context,null);
                                rvDomesticTour.setLayoutManager(new GridLayoutManager(context,2));
                                rvDomesticTour.setAdapter(tourAdapter);
                            }

                        }

                        @Override
                        public void onFailure(Call<ToursResponse> call, Throwable t) {
                            Toast.makeText(context, t.getMessage(), Toast.LENGTH_SHORT).show();
                            Log.d("TAG",t.getMessage());
                        }
                    });
                }catch (Exception e){
                    Log.d("ERROR",e.getMessage());
                }

            }
        });
    }

    @Override
    public int getItemCount() {
        return typePlaces == null ? 0 : typePlaces.size();
    }

    public class TypePlaceViewHolder extends RecyclerView.ViewHolder{
        private Button btnTypePlace;
        private boolean isSelected;

        public TypePlaceViewHolder(@NonNull View itemView){
            super(itemView);
            btnTypePlace = itemView.findViewById(R.id.btn_type_place);
            isSelected = false;
        }
    }
}
