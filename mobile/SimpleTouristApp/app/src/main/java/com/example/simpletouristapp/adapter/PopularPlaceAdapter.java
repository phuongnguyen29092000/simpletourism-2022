package com.example.simpletouristapp.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.ItemPopularPlacesBinding;
import com.example.simpletouristapp.model.PopularPlaces;
import com.squareup.picasso.Picasso;

import java.util.List;

public class PopularPlaceAdapter extends RecyclerView.Adapter<PopularPlaceAdapter.PopularPlaceViewHolder> {

    private Context context;
    private List<PopularPlaces> popularPlaces;

    public PopularPlaceAdapter(Context context, List<PopularPlaces> popularPlaces) {
        this.context = context;
        this.popularPlaces = popularPlaces;
    }

//    @NonNull
//    @Override
//    public com.example.simpletouristapp.ui.domestic.DomesticApdapter.DomesticViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
//        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
//        View view = inflater.inflate(R.layout.item_popular_places, parent, false);
//        return new com.example.simpletouristapp.ui.domestic.DomesticApdapter.DomesticViewHolder(view);
//    }
//
//    @Override
//    public void onBindViewHolder(@NonNull com.example.simpletouristapp.ui.domestic.DomesticApdapter.DomesticViewHolder holder, int position) {
//        PopularPlaces popularPlaces = this.popularPlaces.get(position);
//
//        Picasso.get().load(popularPlaces.getUrl_image()).into(holder.imagePlace);
////        Glide.with(this.context).load(popularPlaces.getUrl_image()).into(holder.imagePlace);
//        holder.tvNamePlace.setText(popularPlaces.getNamePlace());
//    }

    @NonNull
    @Override
    public PopularPlaceViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_popular_places, parent, false);
        return new PopularPlaceViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PopularPlaceViewHolder holder, int position) {
        PopularPlaces popularPlace = popularPlaces.get(position);

        Picasso.get().load(popularPlace.getUrl_image()).into(holder.imagePlace);
        holder.tvNamePlace.setText(popularPlace.getNamePlace());
    }

    @Override
    public int getItemCount() {
        return popularPlaces == null ? 0 : popularPlaces.size();
    }




    public class PopularPlaceViewHolder extends RecyclerView.ViewHolder{

        private ItemPopularPlacesBinding itemPopularPlacesBinding;
        private TextView tvNamePlace;
        private ImageView imagePlace;

        public PopularPlaceViewHolder(@NonNull View itemView) {
            super(itemView);
            imagePlace = itemView.findViewById(R.id.image_place);
            tvNamePlace = itemView.findViewById(R.id.txt_place);

        }
    }
}